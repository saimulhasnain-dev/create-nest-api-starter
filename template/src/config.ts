// Used by ConfigModule.forRoot({ validate }). Fails startup listing every invalid variable. Values are never printed.
export function validateEnv(env: Record<string, unknown>) {
  const problems: string[] = [];
  const nodeEnv = String(env.NODE_ENV || 'development');
  if (!['development', 'production', 'test'].includes(nodeEnv)) problems.push('NODE_ENV must be development, production or test');
  const port = Number(env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) problems.push('PORT must be an integer between 1 and 65535');
  if (problems.length) throw new Error(`Invalid environment:\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  return { ...env, NODE_ENV: nodeEnv, PORT: port };
}
