import React from 'react';
import Link from '@material-ui/core/Link';
import { QUESTIONS } from '../../constants/routes';

function Dashboard() {
  return (
    <div>
      <br />
      <Link href={QUESTIONS} variant="h6">
        {"Submit Assessment"}
      </Link>
    </div>
  );
}

export default Dashboard
