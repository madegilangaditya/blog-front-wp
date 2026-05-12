// lib/wpgraphql.ts

// ----------------------
// Generic Fetch Function
// ----------------------

type GraphQLError = {
  message: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

export async function fetchWPGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: {
    revalidate?: number | false;
  }
): Promise<T> {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error("Missing WORDPRESS_GRAPHQL_ENDPOINT");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables ?? {},
    }),
    cache: options?.revalidate === false ? "no-store" : undefined,
    next:
      options?.revalidate === false
        ? undefined
        : { revalidate: options?.revalidate ?? 60 },
  });

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  if (!json.data) {
    throw new Error("No data returned from WPGraphQL");
  }

  return json.data;
}

//---

// ----------------------
// Page Query (ACF)
// ----------------------

export const GET_PAGE_ACF = `
  query GetPageAcf($uri: ID!) {
    page(id: $uri, idType: URI) {
      title

      components {
        sections {
          __typename

          ... on ComponentsSectionsBannerLayout {
            title

            bannerImage {
              node {
                sourceUrl
                altText
              }
            }

            animationText {
              label
            }
          }
          ... on ComponentsSectionsBioLayout {
            image {
              node {
                sourceUrl
                altText
              }
            }
            title
            subtitle
            description
            addButton
            buttonLink {
              target
              title
              url
            }
            addSkill
            skill {
              skillName
              rate
            }
          }
          ... on ComponentsSectionsServicesCardLayout{
            title
            subtitle
            backgroundImage{
              node{
                sourceUrl
                altText
              }
            }
            services{
              iconImage{
                node{
                  sourceUrl
                  altText
                }
              }
              title
              description
            }
          }
          ... on ComponentsSectionsFeaturedProjectLayout{
            title
            subtitle
            getDataType
            manualSelect{
              nodes{
                ... on Project{
                  id
                  slug
                  title
                  uri
                }
              }
            }
            maximumProjects
            addMoreProject
            moreProjectButton{
              target
              title
              url
            }
          }
        }
      }
    }
  }
`;

export type PageData = {
  page: {
    title: string;
    components?: {
      sections?: {
        __typename: string;
        [key: string]: unknown;
      }[];
    };
  } | null;
};

// Get Projects

export const GET_PROJECTS = `
  query GetProjects($first: Int = 6) {
    projects(
      first: $first
      where: {
        status: PUBLISH
        orderby: {
          field: DATE
          order: DESC
        }
      }
    ) {
      nodes {
        id
        slug
        title
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export type ProjectNode = {
  id: string;
  slug: string;
  title: string;
  uri: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
};

type ProjectsData = {
  projects: {
    nodes: ProjectNode[];
  };
};

export async function getProjects(first = 6) {
  const data = await fetchWPGraphQL<ProjectsData>(GET_PROJECTS, {
    first,
  });

  return data.projects.nodes;
}


export async function getPage(uri: string) {
  return fetchWPGraphQL<PageData>(GET_PAGE_ACF, { uri });
}