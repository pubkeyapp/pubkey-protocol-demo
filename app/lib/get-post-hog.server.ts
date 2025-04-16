import { PostHog } from "posthog-node";


let cachedPostHog: PostHog | null = null

export function getPostHog() {
  if (!process.env.POSTHOG_KEY) {
    console.log('posthog disabled: no key')
    return null
  }
  if (!process.env.POSTHOG_HOST) {
    console.log('posthog disabled: no host')
    return null
  }
  if (!cachedPostHog) {
    cachedPostHog = new PostHog(process.env.POSTHOG_KEY, {
      host: process.env.POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    })
    console.log('posthog init', process.env.POSTHOG_KEY)
  }
  return cachedPostHog
}


export const ph = {
  alias: (props: { distinctId: string, alias: string }) => {
    const pg = getPostHog()
    if (!pg) {
      return
    }
    return pg.alias(props)
  },
  capture: (props: { distinctId: string, event: string, properties?: Record<string | number, any> }) => {
    const pg = getPostHog()
    if (!pg) {
      return
    }
    return pg.capture(props)
  },
  featureEnabled: async (props: {
    distinctId: string,
    key: string,
  }) => {
    const pg = getPostHog()
    if (!pg) {
      return
    }
    return await pg.isFeatureEnabled(props.key, props.distinctId)
  },
  identify: (props: { distinctId: string, properties?: Record<string | number, any>; }) => {
    const pg = getPostHog()
    if (!pg) {
      return
    }
    return pg.identify(props)
  },
  shutdown: async () => {
    const pg = getPostHog()
    if (!pg) {
      return
    }
    return await pg.shutdown()
  },
}