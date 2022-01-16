export const i18n = {
  install: (app, options) => {
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((o, i) => {
        if (o) return o[i] || i
      }, options)
    }
  }
}

import cn from './zh-CN.json'
import en from './EN.json'

export const language = {
  cn,
  en
}