import React, { useState, useEffect} from 'react';
import { poemService } from '../../_services';

function Folklore ({ match }) {
  const [poems, setPoems] = suseState(null);

  useEffect(() => {
    poemService.getAll().then(p => setPoems(x));
  });
};

export { Folklore };