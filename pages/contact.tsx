import { useState } from 'react';
import { VscAccount, VscMail, VscComment } from 'react-icons/vsc';
import ContactCode from '@/components/ContactCode';

import styles from '@/styles/ContactPage.module.css';

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
