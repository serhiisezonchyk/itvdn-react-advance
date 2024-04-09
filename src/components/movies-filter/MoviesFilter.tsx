import { FilterAltOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Skeleton,
  TextField,
  debounce,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeywordItem, useGetGenresQuery, useGetKeywordsQuery } from '../../services/tmdb';
export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}
interface MoviesFilterProps {
  onSubmit(filters: Filters): void;
}
const MoviesFilter = ({ onSubmit }: MoviesFilterProps) => {
  const [keywordsQuery, setKeywordsQuery] = useState<string>('');
  const { data: keywordsOptions = [], isLoading: keywordsLoading } = useGetKeywordsQuery(keywordsQuery, {
    skip: !keywordsQuery,
  });
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  const { handleSubmit, control } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const fetchKeywordsDebounced = useMemo(
    () =>
      debounce((query: string) => {
        setKeywordsQuery(query);
      }, 1000),
    [],
  );
  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: 'block' }}>
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} label="Keywords" />}
                onChange={(_, value) => onChange(value)}
                onInputChange={(_, value) => fetchKeywordsDebounced(value)}
              />
            )}
          />
        </FormControl>
        <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: 'block' }}>
          {genresLoading ? (
            <Skeleton width={300} height={480} />
          ) : (
            <>
              <FormLabel component="legend">Genres</FormLabel>
              <FormGroup sx={{ maxHeight: 500 }}>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      {genres?.map((genre) => (
                        <FormControlLabel
                          key={genre.id}
                          label={genre.name}
                          control={
                            <Checkbox
                              value={genre.id}
                              checked={value.includes(genre.id)}
                              onChange={(event, checked) => {
                                const valueNumber = Number(event.target.value);
                                if (checked) {
                                  onChange([...value, valueNumber]);
                                } else {
                                  onChange(value.filter((value) => value !== valueNumber));
                                }
                              }}
                            />
                          }
                        />
                      ))}
                    </>
                  )}
                />
              </FormGroup>
            </>
          )}
        </FormControl>
        <Button type="submit" variant="contained" startIcon={<FilterAltOutlined />} sx={{ m: 2 }}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};

export default MoviesFilter;
