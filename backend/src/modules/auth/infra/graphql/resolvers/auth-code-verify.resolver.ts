import { AuthCodeVerifyUseCase } from "@/modules/auth/application/use-cases/auth-code-verify.use-case";

export default function authCodeVerify(
  _: any,
  { email, code }: any,
  context: any,
) {
  const useCase = context.container.resolve(AuthCodeVerifyUseCase);

  return useCase.execute({ email, code });
}
