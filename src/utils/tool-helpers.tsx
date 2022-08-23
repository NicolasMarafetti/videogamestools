import prisma from 'lib/prisma';

export async function getRandomTools() {
  const tools = await prisma.tool.findMany({
    select: {
      id: true,
      game: true,
      name: true,
      url: true,
      description: true,
      date_created: true,
      date_updated: true,
      Game: true,
    },
  });

  return tools;
}
