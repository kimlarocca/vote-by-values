import { serverSupabaseClient } from '#supabase/server'
import surveyData from '~/survey.json'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)

    const urls: any[] = []

    // Slugs to exclude from sitemap
    const excludedSlugs = ['kim-larocca']

    // Convert category name to slug (same logic as category page)
    const categoryToSlug = (name: string) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    // Fetch all candidates
    const { data: candidates } = await supabase
        .from('candidates')
        .select('slug, updated_at')

    if (candidates) {
        candidates.forEach((candidate) => {
            // Skip excluded slugs
            if (excludedSlugs.includes(candidate.slug)) return

            urls.push({
                loc: `/${candidate.slug}`,
                lastmod: candidate.updated_at
            })
        })
    }

    // Fetch all races (excluding drafts)
    const { data: races } = await supabase
        .from('races')
        .select('slug, created_at')
        .eq('draft', false)

    if (races) {
        races.forEach((race) => {
            // Add main race page
            urls.push({
                loc: `/race/${race.slug}`,
                lastmod: race.created_at
            })

            // Add race subpages
            urls.push(
                { loc: `/race/${race.slug}/compare` },
                { loc: `/race/${race.slug}/issues-page` },
                { loc: `/race/${race.slug}/social-media` }
            )

            // Add category pages
            surveyData.pages.forEach((page: any) => {
                const categorySlug = categoryToSlug(page.name)
                urls.push({
                    loc: `/race/${race.slug}/categories/${categorySlug}`
                })
            })
        })
    }

    return urls
})
