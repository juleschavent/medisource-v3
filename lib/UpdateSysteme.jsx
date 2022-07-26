import { useContext, useState } from 'react';
import { server } from '../config';

export async function updateSysteme(data) {
  const { id } = data;
  await fetch(`${server}/api/systeme/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    // response.ok ? console.log('success') : console.log('error');
    // return response;
    console.log('res', response);
  });
}
