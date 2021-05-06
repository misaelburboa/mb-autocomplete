import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IssuesProvider } from "../../providers";
import { ReactIssue } from "../../store/actions";
import "./index.css";

const searchProvider = IssuesProvider.getInstance();

interface AutocompleteProps {}

export const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ReactIssue[]>([]);
  const [cursor, setCursor] = useState (-1) 
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async () => {
    if (!debouncedTerm) {
      setSearchResults([]);
      return;
    }

    const { data: { items: issues} } = await searchProvider.getIssues(debouncedTerm);
    setSearchResults(issues);
  }, [debouncedTerm]);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    search();
  }, [debouncedTerm, search]);

  useEffect(() => {
    const onBodyClick = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        resultsRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (event.target === inputRef.current) {
        return
      }

      setSearchResults([]);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  const handleFocus = (event: React.FocusEvent) => {
    if(!resultsRef.current) {
      search()
      setCursor(0)
    }
  }

  
  const loading = useTypedSelector(({ issues }) => issues);
  console.log(loading) 


  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.charCode === 13) {
      event.preventDefault()
    }

    if (event.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1)
    }  else if (event.keyCode === 40 && cursor < searchResults.length - 1) {
      setCursor(cursor + 1)
    }

    if (event.keyCode === 27) {
      setSearchResults([])
    }
  };

  return (
    <div
      className={"globalContainer"}
    >
      <form>
        <div
          className={clsx("anoter-test-class")}
        >
          <input
            autoComplete="off"
            aria-required="true"
            aria-labelledby="search-box-label"
            id="search-box"
            title="Search"
            type="text"
            onFocus={handleFocus}
            onKeyUp={handleKeyPress}
            placeholder={"enter text to search"}
            ref={inputRef}
            onChange={(e) => setTerm(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        </div>
      </form>
      {searchResults.length > 0 && (
        <div ref={resultsRef} className={clsx("resultContainer")}>
          <ul>
            {searchResults.map((result, idx) => {
              return (
                <li
                  key={result.title}
                  className={clsx(
                    "resultsItem",
                    cursor === idx ? 'active' : null
                    )}
                >
                  <a 
                    href={result.url
                      .replace('api.', '')
                      .replace('repos/', '')}
                    target="_blank"
                    rel="noopener noreferrer"  
                    >{result.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  )
};