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
  TextField,
  debounce,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Filter, Genre, KeywordItem, client } from '../../api/tmdb';

const MoviesFilter = ({ onSubmit }: { onSubmit(filter: Filter): void }) => {
  const [keywordsLoading, setKeywordsLoading] = useState<boolean>(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const { handleSubmit, control } = useForm<Filter>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });
  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await client.getGenres();
      setGenres(genres);
    };
    fetchGenres();
  }, []);
  const fetchKeywords = async (query: string) => {
    if (query) {
      setKeywordsLoading(true);
      const options = await client.getKeywords(query);
      setKeywordsLoading(false);
      setKeywordsOptions(options);
    } else {
      setKeywordsOptions([]);
    }
  };
  const fetchKeywordsDebounced = useMemo(() => debounce(fetchKeywords, 1000), []);
  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: 'block' }}>
          <FormLabel component="legend">Keywords</FormLabel>
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
        </FormControl>
        <Button type="submit" variant="contained" startIcon={<FilterAltOutlined />} sx={{ m: 2 }}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};

export default MoviesFilter;
