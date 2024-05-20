import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define un array de rutas públicas
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/api/webhooks(.*)",
]);

// Aplica clerkMiddleware con lógica personalizada para proteger rutas
export default clerkMiddleware((auth, request) => {
  // Si la ruta solicitada no es una ruta pública, protégela con autenticación
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

// Define la configuración para clerkMiddleware
export const config = {
  // Define las rutas contra las que clerkMiddleware debería coincidir
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
