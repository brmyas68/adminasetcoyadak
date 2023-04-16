import { IObject } from 'models'
import { Routes } from 'models'
import { useLoginDataCtx } from 'modules/login/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { TermsAndRulesText } from '../../../modules/login/view/mobile/styles'

const TermsAndRules: FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <TermsAndRulesText dir="rtl" className={className || ''}>
        با ثبت نام در مهرامن،
        <Link href={Routes.termsAndRules}>
          <a className="highlight">شرایط و قوانین </a>
        </Link>
        را میپذیرم.
      </TermsAndRulesText>
    </>
  )
}

export default TermsAndRules
