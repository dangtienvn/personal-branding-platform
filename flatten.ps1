$commits = git log --reverse --format="%H" --no-merges master
$first = $commits[0]
git checkout -B flattened $first
for ($i=1; $i -lt $commits.Length; $i++) {
    $sha = $commits[$i]
    Write-Host "Cherry-picking $sha ($($i+1)/$($commits.Length))"
    git cherry-pick $sha --strategy-option=theirs
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Conflict detected at $sha, attempting to resolve..."
        git add .
        git cherry-pick --continue --no-edit
    }
}
