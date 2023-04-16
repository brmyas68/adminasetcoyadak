import { MenuProps } from 'antd'
import { Routes } from 'models/enums'
import Link from 'next/link'

export const menuItems: MenuProps['items'] = [
  {
    label: (
      <Link href={Routes.Home}>
        <a>خانه</a>
      </Link>
    ),
    key: 'home',
  },
  {
    label: 'خودروهای فرسوده',
    key: 'WornCars',
    children: [
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">directions_car</span>
              {'استعلام قیمت خودرو '}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">directions_car</span> {'ثبت خودروی فرسوده'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">directions_car</span> {'ثبت خودروی فرسوده'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">work_history</span> {'پیگیری سوابق'}
            </a>
          </Link>
        ),
      },
    ],
  },
  {
    label: 'خودرو های وارداتی',
    key: 'ImportedCars',
    children: [
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">directions_car</span>
              {'ثبت سفارش خودرو'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">directions_car</span> {'ثبت خودروی فرسوده'}
            </a>
          </Link>
        ),
      },
      {
        type: 'group',
        label: (
          <Link href={'#'}>
            <a>
              <span className="material-icons">work_history</span> {'پیگیری سوابق'}
            </a>
          </Link>
        ),
      },
    ],
  },
  {
    label: (
      <Link href={Routes.About}>
        <a>درباره ما</a>
      </Link>
    ),
    key: 'about',
  },
  {
    label: (
      <Link href={Routes.Contact}>
        <a>تماس با ما</a>
      </Link>
    ),
    key: 'contact',
  },
]
