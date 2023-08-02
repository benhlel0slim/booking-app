import React, { useEffect, useState } from 'react';
import styles from './adminMenu.module.css';
import {
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRestaurant } from '../../../api/getRestaurant';
import LoadingButton from '../../loadingButton/loadingButton';
import { useEditMenu } from '../../../api/editMenu';
import { toast } from 'react-toastify';

function getStyles(item: string, menus: string[], theme: Theme) {
  return {
    fontWeight:
      menus.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AdminMenu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data } = useQuery(`restaurant-${restaurantId}`, () =>
    getRestaurant(restaurantId || '')
  );

  const { menu } = data ?? {};

  const initMenu = menu || [];

  const [menus, setMenus] = useState<string[]>(initMenu);
  const [item, setItem] = useState('');

  const { mutateAsync, isLoading } = useEditMenu(restaurantId || '');

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const addItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && item.trim() !== '') {
      event.preventDefault();
      setMenus([...menus, item]);
      setItem('');
    }
  };

  const handleDeleteChip = (index: number) => {
    setMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      updatedMenus.splice(index, 1);
      return updatedMenus;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await mutateAsync({ menu: menus });
    if ('cod' in res) {
      const message = res.message.message;
      toast(`Erreur, veuillez réessayer ${message ?? ''}`, {
        position: 'bottom-right',
        type: 'error',
        autoClose: 5000,
      });
      return;
    }
    const { _id } = res;
    navigate(`/admin/restaurant/${_id}/reservation`);
  };
  useEffect(() => {
    setMenus(menu || []);
  }, [menu]);

  if (!data)
    return (
      <div className={styles.circularProgress}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>
          Veuillez ajouter <b>vos menus</b>
        </p>
      </div>
      <form className={styles.forms} onSubmit={onSubmit}>
        <div className={styles.text}>
          <Typography>
            Écrivez le menu, puis, cliquez sur la touche “entrée”
            <br /> pour ajouter le menu à la liste.
            <br /> Enregistrer le menu quand vous êtes satisfait.
            <br /> Pour enlever un item, cliquer sur la croix dans la liste.
          </Typography>
        </div>
        <FormControl variant="standard" sx={{ width: 200 }}>
          <InputLabel>Menus</InputLabel>
          <Select label="Menus" multiple value={menus}>
            {menus?.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                style={getStyles(item, menus, theme)}
              >
                <Chip
                  variant="outlined"
                  label={item}
                  onDelete={() => handleDeleteChip(index)}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Ajouter menu"
          placeholder="Ajouter un menu"
          variant="standard"
          value={item}
          onKeyDown={addItem}
          onChange={handleChangeItem}
        />

        <div className={styles.btn}>
          <LoadingButton isLoading={isLoading}>Enregistrer</LoadingButton>
        </div>
      </form>
    </div>
  );
}

export default AdminMenu;
