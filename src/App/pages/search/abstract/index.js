import React from 'react';
import { AbstractFeedback } from 'App/pages/search/abstract/abstract-feedback';
import { Typography } from 'App/pages/search/typography/index.js';
import { AbstractQuestions } from 'App/pages/search/abstract/abstract-questions/index.js';
import { AbstractAbout } from 'App/pages/search/abstract/abstract-about.js';
import { AbstractTitle } from 'App/pages/search/abstract/abstract-title.js';
import { AbstractContent } from 'App/pages/search/abstract/abstract-content.js';

export function Abstract() {
  return (
    <Typography>
      <AbstractTitle />
      <AbstractContent />
      <AbstractFeedback />
      <AbstractAbout />
      <AbstractQuestions />
    </Typography>
  );
}
