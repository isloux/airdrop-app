export function load({params}) {
  return {
    title: 'Hello world!',
    content: `Vous &egrave; connect&eacute; avec le portefeuille <I>${params.slug}</I>`
  };
}