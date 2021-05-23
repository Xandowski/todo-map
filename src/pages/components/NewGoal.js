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
        console.log(result)
    }

    return (
        <>
        <h2>Add new goal</h2>
        <form onSubmit={registerGoal}>
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Your name" required />
            </div>
            <div>
                <label for="goalType">Goal type</label>
                <select id="goalType">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
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