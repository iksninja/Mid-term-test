export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/my-recipe',
        '/my-favorite',
        '/edit-profile',
        '/create-recipe'
    ]
}