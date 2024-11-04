const login = async (ctx) => {
  const { identifier, password } = ctx.request.body;

  // Use Strapi's built-in authentication logic
  const user = await strapi.plugins["users-permissions"].services.user.fetch({
    email: identifier,
  });

  if (
    !user ||
    !(await strapi.plugins["users-permissions"].services.user.validatePassword(
      password,
      user.password,
    ))
  ) {
    return ctx.badRequest("Invalid credentials");
  }

  const token = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  ctx.cookies.set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  ctx.send({ user });
};
