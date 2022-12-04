import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import type { Pokemon } from '@nx-pokemon-1/shared-types';

export function Index({
  q,
  pokemon: initialPokemon,
}: {
  q: string;
  pokemon: Pokemon[];
}) {
  const [search, setSearch] = useState(q);
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);

  useEffect(() => {
    fetch(`http://localhost:3333/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [search]);

  const onSetSearch = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  }, []);

  return (
    <div>
      <input value={search} onChange={onSetSearch} />
      <ul>
        {pokemon.map(({ name: { english }, id }) => (
          <li key={id}>{english}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  let pokemon = [];

  if (context.query.q) {
    const res = await fetch(
      `http://localhost:3333/search?q=${context.query.q}`
    );
    pokemon = await res.json();
  }

  return {
    props: {
      q: context.query.q ?? '',
      pokemon,
    },
  };
}

export default Index;
