import api from './api';
import { Shop, MinimalShop, ResponseArray } from '../types';

export function getShops(page: number, size: number): Promise<ResponseArray<Shop>> {
  return api.get(`/shops`, { params: { page, size } });
}

export function getShopsSorted(page: number, size: number, sort: string): Promise<ResponseArray<Shop>> {
  return api.get(`/shops`, { params: { page, size, sortBy: sort } });
}

export function getShopsFiltered(page: number, size: number, urlFilters: string): Promise<ResponseArray<Shop>> {
  // urlFilters commence déjà par &inVacations=... etc.
  return api.get(`/shops?page=${page}&size=${size}${urlFilters}`);
}

export function searchShops(page: number, size: number, urlFilters: string): Promise<ResponseArray<Shop>> {
  return api.get(`/shops/search?page=${page}&size=${size}${urlFilters}`);
}

export function getShop(id: string) {
  return api.get<Shop>(`/shops/${id}`);
}

export function createShop(shop: MinimalShop) {
  return api.post<Shop>(`/shops`, shop);
}

export function editShop(shop: MinimalShop) {
  return api.put<Shop>(`/shops`, shop);
}

export function deleteShop(id: string) {
  return api.delete<Shop>(`/shops/${id}`);
}
