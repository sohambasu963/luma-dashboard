import { cookies } from 'next/headers';

export interface Cookie {
  key: string;
  value: string;
  attributes: Record<string, string>;
}

export function parseCookie(cookie: string): Cookie {
  let [head, ...tail] = cookie.split(';');
  let [key, value] = head.split('=');

  let attributes: Record<string, string> = {};
  tail.forEach(attribute => {
      let [attrKey, attrValue] = attribute.split('=');
      if (attrValue) {
          attributes[attrKey.trim()] = decodeURIComponent(attrValue.trim());
      } else {
          attributes[attrKey.trim()] = '';
      }
  });

  return {
      key: key.trim(),
      value: decodeURIComponent(value.trim()),
      attributes: attributes
  };
}