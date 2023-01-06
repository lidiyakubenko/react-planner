import React, {useEffect, useState} from 'react'
import commonStyles from '../common/common.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {sagaActions} from "./sagaActions";
import {selectCatFact, selectDogImg, selectActivity} from "./randomContentSlice";

export function RandomContent() {
  const dispatch = useAppDispatch()
  const dogImg = useAppSelector(selectDogImg)
  const catFact = useAppSelector(selectCatFact)
  const activity = useAppSelector(selectActivity)

  return (
    <div>
      <h2>Random content</h2>
      <button
        className={commonStyles.button}
        onClick={() => dispatch({type: sagaActions.LOAD_RANDOM_CONTENT})}
      >
        load random content
      </button>
      <div>
        <h3>Dog image</h3>
        <img src={dogImg.name} alt="dog" width="300" height="250"/>
        {dogImg.status === 'failed' && <div className={commonStyles.error}>{dogImg.error}</div>}
      </div>
      <p>
        <span>Cat fact:</span>{catFact.name}
        {catFact.status === 'failed' && <div className={commonStyles.error}>{catFact.error}</div>}
      </p>
      <p>
        <span>Activity:</span>{activity.name}
        {activity.status === 'failed' && <div className={commonStyles.error}>{activity.error}</div>}
      </p>
    </div>
  )
}
