export function load({params}) {
  return {
    title: 'Hello world!',
    content: `Vous &ecirc;tes connect&eacute; avec le portefeuille <I>${params.slug}</I>`
  };
}