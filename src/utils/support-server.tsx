import prisma from 'lib/prisma';

export async function saveSupport(
  user: string | null,
  type: string,
  description: string
) {
  await prisma.support.create({
    data: {
      user,
      type,
      description,
    },
  });
}
