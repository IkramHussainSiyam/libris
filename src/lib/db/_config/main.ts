export const adminEmail = "rkrabbikhanbnl@gmail.com";

export function isAdmin(userEmail: string) {
  return userEmail === adminEmail;
}
