export const $ = (selector) => document.querySelector(selector)
export const C = (selector) => document.createElement(selector)

export const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const generateRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)
