import React, { useEffect } from 'react'
import { Form, Typography } from 'antd'
import GetUserInformationButtons from '../getUserInformationButtons'
import { SpecializedInformationContainer, SpecializedInformationTitle } from './style'
import ItinerantUserForm from './components/itinerantUserForm'
import FixedUserForm from './components/fixedUserForm'
import { useGetUserInformationDataCtx } from 'modules/getUserInformation/context'
import { BackButton } from 'components/uiKit/backButton'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { conditionRole } from './helper/conditionRole'

import { useSpecializedInformationCtx } from 'modules/getUserInformation/context/SpecializedInformation'
import { useUserInfo } from 'hooks/userInfo'

const SpecializedInformation = () => {
  const { user } = useUserInfo()

  const { states, handlers } = useGetUserInformationDataCtx()
  const { userRoleTitle, userRoleTag } = states

  const {
    states: { selectsLoading, infoSpecialty, mapRef },
    handlers: { onRegister, setStoreInfoHandler },
    requests: { getStoreReq },
  } = useSpecializedInformationCtx()

  const [SpecializedInformationForm] = Form.useForm()

  useEffect(() => {
    if (!infoSpecialty) return

    SpecializedInformationForm.setFieldsValue({
      typeVehicles: infoSpecialty.infSpec_VehclTyp,
      yearActivity: infoSpecialty.infSpec_WorkExper,
      carModel: infoSpecialty.infSpec_ModlCar,
      mainSkills: infoSpecialty.infSpec_AbiltMajor,
      subSkills: infoSpecialty?.infSpec_AbiltOther ? infoSpecialty?.infSpec_AbiltOther?.split(',')?.map(i => Number(i)) : undefined,
      carColor: infoSpecialty.infSpec_ColorCar,
      specializedCar: infoSpecialty.infSpec_AbiltBrandCar?.split(',').map(i => Number(i)),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoSpecialty])

  useEffect(() => {
    if (!user) return

    getStoreReq(user.userInfo?.usr_ID as number).then(store => {
      if (store) {
        setStoreInfoHandler(store)

        store?.location && mapRef?.current?.setLatLng({ lat: store.location?.loc_Lat, lng: store.location?.loc_Long })
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <SpecializedInformationContainer>
        <SpecializedInformationTitle>
          <section className="header-title">
            <Typography.Title level={5}>ثبت اطلاعات تخصصی</Typography.Title>
            <ButtonUiKit className="text-role" type="text">
              {userRoleTitle}
            </ButtonUiKit>
          </section>
          <Typography.Text>
            لطفا اطلاعات خواسته شده را تکمیل و در نهایت بر روی دکمه <span className="font-bold">“ثبت نهایی”</span> بزنید
          </Typography.Text>
        </SpecializedInformationTitle>

        <Form onFinish={onRegister} layout="vertical" dir="rtl" form={SpecializedInformationForm} scrollToFirstError={true}>
          <section className="form-container">
            {conditionRole(userRoleTag) == 'itinerantUser' ? (
              <ItinerantUserForm useForm={SpecializedInformationForm} />
            ) : (
              <FixedUserForm useForm={SpecializedInformationForm} />
            )}
          </section>

          <GetUserInformationButtons
            submitTitle="ثبت نهایی"
            submitIcon={<span className="material-icons">done</span>}
            hasBack={true}
            onClickBack={() => handlers.stepHandler(2)}
            loading={selectsLoading.finaleInsert}
          />
        </Form>
      </SpecializedInformationContainer>
    </>
  )
}

export default SpecializedInformation
