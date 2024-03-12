import NavDropdown from 'react-bootstrap/NavDropdown'
import { useTranslation, Trans } from 'react-i18next'

const LanguagesChange = () => {
  const { t, i18n } = useTranslation()

  const handleChangeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <NavDropdown
        title={i18n.language === 'vi' ? 'Vietnamese' : 'English'}
        id='basic-nav-dropdown1'
        className='languages'
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>
          English
          <span className='fi fi-gb ms-2'></span>
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>
          Vietnamese
          <span className='fi fi-vn ms-2'></span>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default LanguagesChange
