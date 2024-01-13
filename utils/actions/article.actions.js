"use server";
import prisma from "@/utils/prisma";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const createArticle = async (article) => {
  try {
    const data = await prisma.article.create({
      data: {
        title: article.title,
        body: article.body,
        slug: article.slug,
        thumbnail: article.thumbnail,
        published: article.published,
        author: {
          connect: {
            clerkId: article.authorId,
          },
        },
        categories: {
          connect: article.categories.map((category) => ({
            id: category,
          })),
        },
      },
    });
    console.log(data);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getArticles = async () => {
  try {
    const data = await prisma.article.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
        categories: true,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingArticles = async () => {
  try {
    const data = await prisma.article.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
        categories: true,
      },
      orderBy: {
        views: "desc",
      },
      take: 6,
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesByAuthor = async (authorId) => {
  try {
    const data = await prisma.article.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: true,
        categories: true,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const data = await prisma.article.delete({
      where: {
        id: articleId,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const data = await prisma.article.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: true,
        categories: true,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (article) => {
  try {
    const data = await prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
        title: article.title,
        body: article.body,
        slug: article.slug,
        thumbnail: article.thumbnail,
        published: article.published,
        categories: {
          connect: article.categories.map((category) => ({
            id: category,
          })),
        },
      },
    });
    console.log(data);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const rateLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "60 s"),
});

export const updateViews = async (slug, userId) => {
  // limit each IP to 100 views per day user id and slug
  const { success } = await rateLimiter.limit(`${userId}-${slug}`);
  if (!success) {
    console.log("Rate limit exceeded");
    return;
  }

  try {
    const data = await prisma.article.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    // console.log(data);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesByCategory = async (slug) => {
  // decode slug remove dashes and capitalize
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  try {
    const data = await prisma.article.findMany({
      where: {
        categories: {
          some: {
            name: name,
          },
        },
        published: true,
      },
      include: {
        author: true,
        categories: true,
      },
    });
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
