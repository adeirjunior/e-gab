import prisma from "@/lib/configs/prisma";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams.token) {
    const user = await prisma.user.findUnique({
      where: {
        emailVerificationToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <div>Token inválido</div>;
    }

    await prisma.user.update({
      where: {
        emailVerificationToken: searchParams.token as string,
      },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    return (
      <div>
        <h1>
          Email de <b>{user.email}</b> verificado!
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Verificar email</h1>
        Nenhum token encontrado. Cheque seu email.
      </div>
    );
  }
};

export default VerifyEmailPage;
