export function scanCssClasses(): string[] {
  const classes = new Set<string>();
  const all = document.querySelectorAll('*');

  for (let i = 0; i < all.length; i++) {
    if (i > 2000) break;
    const el = all[i];
    for (const cls of el.classList) {
      if (
        cls.startsWith('_') ||
        cls.includes('-') ||
        cls.startsWith('css-') ||
        cls.startsWith('sc-') ||
        cls.startsWith('mantine-') ||
        cls.startsWith('chakra-') ||
        cls.startsWith('mdc-') ||
        cls.startsWith('ant-') ||
        cls.startsWith('el-') ||
        cls.startsWith('mu-') ||
        cls.startsWith('Mui') ||
        cls.startsWith('fb-') ||
        cls.startsWith('tw-') ||
        cls.startsWith('w-') ||
        cls.startsWith('h-') ||
        cls.startsWith('p-') ||
        cls.startsWith('m-') ||
        cls.startsWith('flex') ||
        cls.startsWith('grid') ||
        cls.startsWith('gap-') ||
        cls.startsWith('justify-') ||
        cls.startsWith('items-') ||
        cls.startsWith('text-') ||
        cls.startsWith('bg-') ||
        cls.startsWith('border-') ||
        cls.startsWith('rounded-') ||
        cls.startsWith('shadow-') ||
        cls.startsWith('font-') ||
        cls.startsWith('leading-') ||
        cls.startsWith('tracking-') ||
        cls.startsWith('opacity-') ||
        cls.startsWith('z-') ||
        cls.startsWith('col-') ||
        cls.startsWith('row-') ||
        cls.startsWith('sm:') ||
        cls.startsWith('md:') ||
        cls.startsWith('lg:') ||
        cls.startsWith('xl:') ||
        cls.startsWith('2xl:') ||
        cls.startsWith('dark:') ||
        cls.startsWith('hover:') ||
        cls.startsWith('focus:') ||
        cls.startsWith('active:') ||
        cls.startsWith('container') ||
        cls.startsWith('btn') ||
        cls.startsWith('nav') ||
        cls.startsWith('header') ||
        cls.startsWith('footer') ||
        cls.startsWith('sidebar') ||
        cls.startsWith('card') ||
        cls.startsWith('modal') ||
        cls.startsWith('dropdown') ||
        cls.startsWith('dropdown-') ||
        cls.startsWith('menu') ||
        cls.startsWith('tooltip') ||
        cls.startsWith('popover') ||
        cls.startsWith('accordion') ||
        cls.startsWith('carousel') ||
        cls.startsWith('tab') ||
        cls.startsWith('badge') ||
        cls.startsWith('avatar') ||
        cls.startsWith('spinner') ||
        cls.startsWith('skeleton') ||
        cls.startsWith('toast') ||
        cls.startsWith('alert') ||
        cls.startsWith('progress') ||
        cls.startsWith('slider')
      ) {
        classes.add(cls);
      }
    }
  }

  return [...classes].slice(0, 200);
}
