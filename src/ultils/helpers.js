import React from 'react';
import icons from './icons'

const { FaRegStar, FaStar } = icons

export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join("")
export const formatPrice = price => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

export const VNDPrice = number => Math.round(number/1000)*1000

