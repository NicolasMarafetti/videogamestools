import prisma from 'lib/prisma';

const bcrypt = require('bcrypt');

export async function findUserWithEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function findUserWithPseudo(pseudo: string) {
  const user = await prisma.user.findUnique({
    where: {
      pseudo,
    },
  });

  return user;
}

export async function passwordsCorrespond(
  password1: string,
  password2: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password1, password2)
      .then((valid: boolean) => {
        resolve(valid);
      })
      .catch(() => reject());
  });
}

export async function saveUser(
  country: string,
  pseudo: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string
) {
  const user = await prisma.user.create({
    data: {
      country,
      pseudo,
      first_name,
      last_name,
      email,
      password,
    },
  });

  return user;
}
