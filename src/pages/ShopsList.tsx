import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ErrorMessage from '../components/ErrorMessage';

interface Shop {
  id: number;
  name: string;
  createdAt: string;
  nbProducts: number;
  nbDistinctCategories?: number;
  inVacations: boolean;
}

interface PageData {
  content: Shop[];
  totalPages: number;
  number: number;
}

const ShopsList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchShops();
  }, [page]);

  const fetchShops = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<PageData>(`/shops?page=${page}&size=9`);
      setShops(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement des boutiques...</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Gestion de boutiques</h1>
      
      <ErrorMessage error={error} onClose={() => setError(null)} />

      <div className="shops-grid">
        {shops.map((shop: Shop) => (
          <div key={shop.id} className="shop-card">
            <h3>{shop.name}</h3>
            <p>
              <strong>Créée le :</strong>{' '}
              {new Date(shop.createdAt).toLocaleDateString('fr-FR')}
            </p>
            <p>
              <strong>Nombre de produits :</strong> {shop.nbProducts}
            </p>
            {shop.nbDistinctCategories !== undefined && (
              <p>
                <strong>Catégories distinctes :</strong> {shop.nbDistinctCategories}
              </p>
            )}
            <p>
              <span className={`status ${shop.inVacations ? 'closed' : 'open'}`}>
                {shop.inVacations ? 'En congé' : 'Ouverte'}
              </span>
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(page - 1)} 
            disabled={page === 0}
            type="button"
          >
            ← Précédent
          </button>
          <span className="page-info">
            Page {page + 1} sur {totalPages}
          </span>
          <button 
            onClick={() => setPage(page + 1)} 
            disabled={page >= totalPages - 1}
            type="button"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopsList;
