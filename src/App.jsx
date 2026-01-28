import { useState, useEffect } from 'react'
import './App.css'
import catsImage from './assets/cats.webp'

const RESTAURANTS = [
  { name: 'Cintro on Wellington', url: 'https://www.cintro.ca/' },
  { name: "Dimi's Greek House", url: 'https://www.dimis.ca/ ' },
  { name: 'Five87 Bistro', url: 'https://www.five87bistro.com/' },
  { name: 'Hunter & Co', url: 'https://www.hunterandcorestaurant.com/' },
  { name: 'Other (please call Stephan)'}
]

const NO_BUTTON_MESSAGES = [
  'Are you sure?',
  'Be for real?',
  'Are you sure sure?',
  'ARE YOU REALLY SURE?',
  'Wow you are clicking this button way too many times',
  'Now there\'s only 1 option left....'
]

const VALENTINE_QUESTIONS = [
  'Will you be my valentine?',
  'Are you sure?',
  'Be for real?',
  'Are you sure sure?',
  'ARE YOU REALLY SURE?',
  'Wow you are clicking this button way too many times',
  'Now there\'s only 1 option left....'
]

function App() {
  const [stage, setStage] = useState('nameCheck')
  const [showHearts, setShowHearts] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [noClicks, setNoClicks] = useState(0)
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [restaurantIndex, setRestaurantIndex] = useState(0)
  const [showBlur, setShowBlur] = useState(false)
  const [nameQuestionText, setNameQuestionText] = useState('')
  const [restaurantTexts, setRestaurantTexts] = useState(RESTAURANTS.map(() => ''))
  const [scheduleText, setScheduleText] = useState('')

  // Typewriter effect for initial question
  useEffect(() => {
    if (stage === 'nameCheck') {
      setNameQuestionText('')
      const fullText = 'Is your name Briana Francis?'
      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setNameQuestionText(fullText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
      return () => clearInterval(typeInterval)
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'hearts') {
      setShowHearts(true)
      const timer = setTimeout(() => {
        setShowHearts(false)
        setStage('password')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  // Typewriter effect for restaurants
  useEffect(() => {
    if (stage === 'restaurants') {
      setScheduleText('')
      setRestaurantTexts(RESTAURANTS.map(() => ''))
      setRestaurantIndex(0)
      setShowRestaurants(false)
      const scheduleFull = 'Clear your schedule on the 13th'
      let scheduleIndex = 0
      
      const scheduleInterval = setInterval(() => {
        if (scheduleIndex < scheduleFull.length) {
          setScheduleText(prev => prev + scheduleFull[scheduleIndex])
          scheduleIndex++
        } else {
          clearInterval(scheduleInterval)
          setTimeout(() => {
            setShowRestaurants(true)
          }, 500)
        }
      }, 50)

      return () => clearInterval(scheduleInterval)
    }
  }, [stage])

  useEffect(() => {
    if (showRestaurants && restaurantIndex < RESTAURANTS.length) {
      const currentRestaurant = RESTAURANTS[restaurantIndex]
      let charIndex = 0
      
      const typeInterval = setInterval(() => {
        if (charIndex < currentRestaurant.name.length) {
          setRestaurantTexts(prev => {
            const newTexts = [...prev]
            newTexts[restaurantIndex] = currentRestaurant.name.substring(0, charIndex + 1)
            return newTexts
          })
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setRestaurantIndex(prev => prev + 1)
          }, 500)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [showRestaurants, restaurantIndex])

  const handleNameCheck = (isYes) => {
    if (isYes) {
      setStage('hearts')
    } else {
      setStage('notForYou')
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === '3580') {
      setPasswordError(false)
      setStage('valentine')
    } else {
      setPasswordError(true)
    }
  }

  const handleNoClick = () => {
    if (noClicks < NO_BUTTON_MESSAGES.length - 1) {
      setNoClicks(prev => prev + 1)
    }
  }

  const getValentineQuestion = () => {
    return VALENTINE_QUESTIONS[Math.min(noClicks, VALENTINE_QUESTIONS.length - 1)]
  }

  const handleYesClick = () => {
    setStage('restaurants')
  }

  const handleTheresMore = () => {
    const today = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth() + 1

    if (currentMonth === 2 && currentDate === 14) {
      // It's February 14th, allow access
      // You can add more content here
      alert('Happy Valentine\'s Day! More surprises await!')
    } else {
      setShowBlur(true)
    }
  }

  const renderContent = () => {
    switch (stage) {
      case 'nameCheck':
        const fullQuestion = 'Is your name Briana Francis?'
        const showButtons = nameQuestionText === fullQuestion
        return (
          <div className="stage-container white-bg">
            <h1 className="question-text typewriter-text">
              {nameQuestionText}
              {nameQuestionText.length > 0 && <span className="cursor">|</span>}
            </h1>
            {showButtons && (
              <div className="button-group">
                <button className="btn btn-yes" onClick={() => handleNameCheck(true)}>Yes</button>
                <button className="btn btn-no" onClick={() => handleNameCheck(false)}>No</button>
              </div>
            )}
          </div>
        )

      case 'notForYou':
        return (
          <div className="stage-container black-bg">
            <h1 className="message-text">This is not for you then.</h1>
          </div>
        )

      case 'hearts':
        return (
          <div className="stage-container black-bg hearts-container">
            {showHearts && <HeartAnimation />}
          </div>
        )

      case 'password':
        return (
          <div className="stage-container black-bg">
            <h2 className="verify-text">Please verify the truth</h2>
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError(false)
                }}
                placeholder="Enter your Apple Watch password"
                className="password-input"
                autoFocus
              />
              <button type="submit" className="btn btn-submit">Verify</button>
              {passwordError && (
                <p className="error-message">Get out of here you fake!</p>
              )}
            </form>
          </div>
        )

      case 'valentine':
        return (
          <div className="stage-container pink-bg valentine-stage">
            <img src={catsImage} alt="Cats" className="cats-image" />
            <h1 className="valentine-question">{getValentineQuestion()}</h1>
            <div className="button-group">
              <button 
                className={`btn btn-yes ${noClicks >= 5 ? 'double-yes' : ''}`}
                onClick={handleYesClick}
                style={{
                  fontSize: `${1 + noClicks * 0.2}rem`,
                  transform: `scale(${1 + noClicks * 0.1})`
                }}
              >
                Yes
              </button>
              {noClicks < 5 ? (
                <button className="btn btn-no" onClick={handleNoClick}>
                  No
                </button>
              ) : (
                <button 
                  className="btn btn-yes double-yes"
                  onClick={handleYesClick}
                  style={{
                    fontSize: `${1 + noClicks * 0.2}rem`,
                    transform: `scale(${1 + noClicks * 0.1})`
                  }}
                >
                  Yes
                </button>
              )}
            </div>
          </div>
        )

      case 'restaurants':
        return (
          <div className="stage-container solid-black-bg restaurants-stage">
            <h1 className="royal-title typewriter-text">
              {scheduleText}
              {scheduleText === 'Please clear your schedule on the 13th' && <span className="cursor">|</span>}
            </h1>
            <div className="restaurants-list">
              {RESTAURANTS.map((restaurant, index) => (
                <a
                  key={index}
                  href={restaurant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`restaurant-btn ${index < restaurantIndex ? 'visible' : index === restaurantIndex && showRestaurants ? 'typing' : 'hidden'}`}
                >
                  {index < restaurantIndex ? restaurant.name : index === restaurantIndex && showRestaurants ? (
                    <>
                      {restaurantTexts[index]}
                      <span className="cursor">|</span>
                    </>
                  ) : ''}
                </a>
              ))}
            </div>
            {restaurantIndex >= RESTAURANTS.length && (
              <button 
                className="theres-more-btn fade-in"
                onClick={handleTheresMore}
              >
                There's more
              </button>
            )}
            {showBlur && (
              <div className="blur-overlay">
                <p className="blur-message">This website is only unlockable on February 14th.</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="app">
      {renderContent()}
    </div>
  )
}

function HeartAnimation() {
  const hearts = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="hearts-wrapper">
      {hearts.map((heart) => (
        <div
          key={heart}
          className="heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default App

