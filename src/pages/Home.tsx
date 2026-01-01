import {
  Box,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filters, ShopCard } from '../components';
import { useAppContext } from '../context';
import { ShopService } from '../services';
import { ResponseArray, Shop } from '../types';

const Home = () => {
  const navigate = useNavigate();
  const { setLoading } = useAppContext();
  const [shops, setShops] = useState<Shop[] | null>(null);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(0);

  const [sort, setSort] = useState<string>('');
  const [filters, setFilters] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const getShops = () => {
    setLoading(true);
    let promisedShops: Promise<ResponseArray<Shop>>;

    if (search.trim()) {
      const searchFilters = `&text=${encodeURIComponent(search.trim())}${filters}`;
      promisedShops = ShopService.searchShops(pageSelected, 9, searchFilters);
    } else if (sort) {
      promisedShops = ShopService.getShopsSorted(pageSelected, 9, sort);
    } else if (filters) {
      promisedShops = ShopService.getShopsFiltered(pageSelected, 9, filters);
    } else {
      promisedShops = ShopService.getShops(pageSelected, 9);
    }

    promisedShops
      .then((res) => {
        setShops(res.data.content || []);
        setCount(res.data.totalPages || 0);

        const currentPage = res.data.pageable?.pageNumber ?? res.data.number ?? 0;
        setPage(currentPage + 1);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des boutiques:', error);
        setShops([]);
        setCount(0);
        setPage(1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getShops();
  }, [pageSelected, sort, filters, search]);

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageSelected(value - 1);
  };

  const handleChangeSort = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
    setPageSelected(0);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <Typography variant="h2">Les boutiques</Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Fab variant="extended" color="primary" aria-label="add" onClick={() => navigate('/shop/create')}>
          <AddIcon sx={{ mr: 1 }} />
          Ajouter une boutique
        </Fab>
      </Box>

      {/* Barre de recherche + tri + filtres */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          label="Rechercher par nom"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageSelected(0);
          }}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">Trier par</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sort}
            label="Trier par"
            onChange={handleChangeSort}
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <MenuItem value="name">Nom</MenuItem>
            <MenuItem value="createdAt">Date de création</MenuItem>
            <MenuItem value="nbProducts">Nombre de produits</MenuItem>
          </Select>
        </FormControl>

        <Filters setUrlFilters={setFilters} setSort={setSort} sort={sort} />
      </Box>

      {/* Boutiques */}
      <Grid container alignItems="center" rowSpacing={3} columnSpacing={3}>
        {shops?.map((shop) => (
          <Grid item key={shop.id} xs={4}>
            <ShopCard shop={shop} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {shops && shops.length > 0 ? (
        <Pagination count={count} page={page} siblingCount={1} onChange={handleChangePagination} />
      ) : (
        <Typography variant="h5" sx={{ mt: -1 }}>
          Aucune boutique correspondante
        </Typography>
      )}
    </Box>
  );
};

export default Home;
