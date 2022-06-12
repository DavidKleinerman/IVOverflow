import React, { Fragment, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const QuestionsMain = React.lazy(() => import("./pages/QuestionsMain"));
const AllQuestions = React.lazy(() => import("./pages/AllQuestions"));
const QuestionDetail = React.lazy(() => import("./pages/QuestionDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const path = isLoggedIn ? "/questions/all-questions" : "/signup";

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to={path} replace={true} />} />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Suspense fallback={<h3>Loading...</h3>}>
                <AuthPage />
              </Suspense>
            ) : (
              <Navigate to="/questions/all-questions" replace={true} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <Suspense fallback={<h3>Loading...</h3>}>
                <AuthPage />
              </Suspense>
            ) : (
              <Navigate to="/questions/all-questions" replace={true} />
            )
          }
        />
        {isLoggedIn && (
          <Route
            path="/questions/*"
            element={
              <Suspense fallback={<h3>Loading...</h3>}>
                <QuestionsMain />
              </Suspense>
            }
          >
            <Route
              path="all-questions"
              element={
                <Suspense fallback={<h3>Loading...</h3>}>
                  <AllQuestions />
                </Suspense>
              }
            />
            <Route
              path="question-detail/:questionId"
              element={
                <Suspense fallback={<h3>Loading...</h3>}>
                  <QuestionDetail />
                </Suspense>
              }
            />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
