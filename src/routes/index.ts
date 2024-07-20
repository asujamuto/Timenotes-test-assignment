
import { createRootRoute, createRouter } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import LoginScreen from "../pages/LoginScreen.tsx";
import Home from "../pages/Home.tsx";

const rootRoute = createRootRoute({
})

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: LoginScreen
})

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/home',
	component: Home
})

const routeTree = rootRoute.addChildren([indexRoute, homeRoute])
const router = createRouter({ routeTree })

export default router