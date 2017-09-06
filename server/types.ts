/**
 * The types used by the server.
 */

/**
 * A context in which the router performs its server-side rendering.
 * Used in order to determine whether or not the router wants to
 * perform a redirect.
 * 
 * @interface RouterContext
 */
interface RouterContext {
  url?: string
}
