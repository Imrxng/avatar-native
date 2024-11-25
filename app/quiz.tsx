import { DataContext } from '@/datacontext';
import React, { useContext, useState } from "react";
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, Alert } from "react-native";

const Quiz = () => {
    const { questions, theme } = useContext(DataContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleAnswerPress = (selectedAnswer: string) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
    };

    if (quizCompleted) {
        return (
            <ImageBackground
                source={theme}
                style={styles.container}
                resizeMode="cover"
            >
                <Text style={styles.title}>Quiz Completed!</Text>
                <Text style={styles.score}>Your Score: {score}/{questions.length}</Text>
                <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
                    <Text style={styles.resetButtonText}>Retry Quiz</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <ImageBackground
            source={theme}
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={styles.title}>Quiz</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
                <View style={styles.containerButtons}>
                    {currentQuestion.possibleAnsers.map((answer, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.answerButton}
                            onPress={() => handleAnswerPress(answer)}
                        >
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: "center"
    },
    title: {
        fontSize: 80,
        fontWeight: 100,
        marginTop: 80,
        marginBottom: 60,
        textAlign: "center",
        color: '#141115',
        fontFamily: 'avatarock'
    },
    questionContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    questionText: {
        fontSize: 25,
        marginBottom: 20,
        textAlign: 'center',
        color: '#141115',
        fontFamily: 'avatarock',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    answerButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        flexBasis: '45%',
        alignItems: 'center',
    },
    answerText: {
        fontSize: 18,
        color: '#141115',
        fontFamily: 'avatarock',
    },
    score: {
        fontSize: 30,
        color: '#141115',
        fontFamily: 'avatarock',
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    resetButton: {
        backgroundColor: '#141115',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    resetButtonText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'avatarock',
    },
    containerButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        width: '100%',
    }
});

export default Quiz;