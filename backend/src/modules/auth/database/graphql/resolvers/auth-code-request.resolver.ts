import { AuthCodeRequestUseCase } from "@/modules/auth/application/use-cases/auth-code-request.use-case";

export default function authCodeRequest(_: any, { email }: any, context: any) {
  const useCase = context.container.resolve(AuthCodeRequestUseCase);

  return useCase.execute({ email });
}
