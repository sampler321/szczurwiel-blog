// lib/ghost.js
import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
    url: process.env.GHOST_URL,
    key: process.env.GHOST_KEY,
    version: 'v5.0',
})

export async function getAllPostsForHome() {
    const posts = await api.posts.browse({
        limit: 'all',
        include: 'tags,authors',
        fields: 'id,title,slug,published_at,feature_image,excerpt,custom_excerpt',
    })
    // We format the data to match what the template expects
    return posts.map((post) => ({
        slug: post.slug,
        date: post.published_at,
        title: post.title,
        summary: post.custom_excerpt || post.excerpt,
        tags: post.tags.map((tag) => tag.name),
    }))
}

export async function getAllPostsWithSlug() {
    const posts = await api.posts.browse({
        limit: 'all',
        fields: 'slug',
    })
    return posts
}

export async function getPostAndMorePosts(slug) {
    const singlePost = await api.posts.read({ slug }, { include: 'tags,authors' })
    // We format the data to match what the component expects.
    return {
        post: {
            slug: singlePost.slug,
            date: singlePost.published_at,
            title: singlePost.title,
            tags: singlePost.tags.map((tag) => tag.name),
            author: singlePost.primary_author,
            content: singlePost.html,
        },
    }
}


export async function getAuthorDetails(slug) {
    try {
        const author = await api.authors.read(
            { slug },
            { fields: 'id,name,slug,profile_image,url' }
        )
        return author
    } catch (e) {
        return null
    }
}
