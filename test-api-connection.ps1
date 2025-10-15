# API Connection Test Script

Write-Host "=== TESTING API CONNECTION BETWEEN FRONTEND & BACKEND ===" -ForegroundColor Cyan

# Test Backend Health
Write-Host "`n1. Testing Backend Health..." -ForegroundColor Green
try {
    $healthResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/health" -Method GET
    Write-Host "✅ Backend Health: $($healthResponse.status)" -ForegroundColor Green
    Write-Host "   Uptime: $($healthResponse.uptime) seconds" -ForegroundColor Gray
} catch {
    Write-Host "❌ Backend Health Failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test Profile API (Empty database expected)
Write-Host "`n2. Testing Profile API..." -ForegroundColor Green
try {
    $profileResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/profile" -Method GET
    Write-Host "✅ Profile API: Success" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "✅ Profile API: Not found (Expected for empty DB)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Profile API Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test Projects API
Write-Host "`n3. Testing Projects API..." -ForegroundColor Green
try {
    $projectsResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/projects" -Method GET
    Write-Host "✅ Projects API: Success (Found $($projectsResponse.length) projects)" -ForegroundColor Green
} catch {
    Write-Host "❌ Projects API Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Skills API
Write-Host "`n4. Testing Skills API..." -ForegroundColor Green
try {
    $skillsResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/skills" -Method GET
    Write-Host "✅ Skills API: Success (Found $($skillsResponse.length) skills)" -ForegroundColor Green
} catch {
    Write-Host "❌ Skills API Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Experience API
Write-Host "`n5. Testing Experience API..." -ForegroundColor Green
try {
    $experienceResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/experience" -Method GET
    Write-Host "✅ Experience API: Success (Found $($experienceResponse.length) experiences)" -ForegroundColor Green
} catch {
    Write-Host "❌ Experience API Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Education API
Write-Host "`n6. Testing Education API..." -ForegroundColor Green
try {
    $educationResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/education" -Method GET
    Write-Host "✅ Education API: Success (Found $($educationResponse.length) education records)" -ForegroundColor Green
} catch {
    Write-Host "❌ Education API Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Contact API (POST)
Write-Host "`n7. Testing Contact API (POST)..." -ForegroundColor Green
try {
    $contactData = @{
        name = "Test User"
        email = "test@example.com"
        subject = "API Test"
        message = "This is a test message from API connection test"
        projectType = "web-development"
        budget = "1000-5000"
    } | ConvertTo-Json

    $contactResponse = Invoke-RestMethod -Uri "http://127.0.0.1:5000/api/contact" -Method POST -Body $contactData -ContentType "application/json"
    Write-Host "✅ Contact API: Message sent successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Contact API Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Check Frontend Status
Write-Host "`n8. Testing Frontend Connection..." -ForegroundColor Green
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 5
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend: Running on http://localhost:3001" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Frontend: Not accessible at http://localhost:3001" -ForegroundColor Red
    Write-Host "   Make sure frontend is running with 'npm start'" -ForegroundColor Gray
}

Write-Host "`n=== API CONNECTION TEST COMPLETED ===" -ForegroundColor Cyan
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Backend is running: http://localhost:5000" -ForegroundColor Gray
Write-Host "2. Frontend is running: http://localhost:3001" -ForegroundColor Gray
Write-Host "3. Test the contact form on frontend to verify API integration" -ForegroundColor Gray