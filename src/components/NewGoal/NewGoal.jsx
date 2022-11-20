const NewGoal = () => {

    const registerGoal = async event => {
        event.preventDefault()
    
        const res = await fetch(
          '/api/goals/add',
          {
            body: JSON.stringify({
                name: event.target.name.value,
                type: event.target.goalType.value 
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        )
    
        const result = await res.json()
    }

    return (
        <>
        <h2>New goal</h2>
        <form onSubmit={registerGoal}>
            <div>
                <label htmlFor="name">Goal name </label>
                <input type="text" id="name" required />
            </div>
            <div>
                <label htmlFor="goalType">Goal type </label>
                <select id="goalType">
                    <option value="1">Daily</option>
                    <option value="2">Weekly</option>
                    <option value="3">Monthly</option>
                </select>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
        </>
    )
  }
  
  export default NewGoal