let assignmentId;

function assignment() {
  fetch('https://one00x-data-analysis.onrender.com/assignment?email=adeesh.g47@gmail.com')
      .then((res) => {
        if (res.status === 200) {
          assignmentId = res.headers.get('x-assignment-id');
          return res.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        console.log(assignmentId);

        const mostUsedWord = findMostUsedWord(data);

        console.log(mostUsedWord)

        const Data = {
          assignment_id: assignmentId,
          answer: mostUsedWord,
        };

        return fetch('https://one00x-data-analysis.onrender.com/assignment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Data),
        });
      })

      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to submit the answer');
        }
      })

      .then((data) => {
        console.log(data);
      })

      .catch((error) => {
        if (error.message.includes('HTTP 500')) {
          assignment()
        } else {
          console.log(error.message);
        }
      });
}

function findMostUsedWord(list) {
  const wordCount = {};

  list.forEach(item => {
    const words = item.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word) {
        if (wordCount[word]) {
          wordCount[word]++;
        } else {
          wordCount[word] = 1;
        }
      }
    });
  });

  let mostUsedWord = '';
  let highestFrequency = 0;

  for (const word in wordCount) {
    if (wordCount[word] > highestFrequency) {
      mostUsedWord = word;
      highestFrequency = wordCount[word];
    }
  }
  return mostUsedWord;
}

assignment();