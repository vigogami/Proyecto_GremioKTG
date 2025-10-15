import type { App } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/util/colors'

export function registerPlugins(app: App) {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          colors: {
            primary: colors.purple.darken4,
            secondary: colors.purple.darken3
          }
        }
      }
    }
  })

  app.use(vuetify)
}
